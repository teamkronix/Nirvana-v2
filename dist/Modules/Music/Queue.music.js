import Dispatcher from './Dispatcher.music.js';

export class Queue extends Map {
    constructor(client) {
        super();
        this.client = client;
    }

    get(guildId) {
        return super.get(guildId);
    }

    set(guildId, dispatcher) {
        return super.set(guildId, dispatcher);
    }

    delete(guildId) {
        return super.delete(guildId);
    }

    clear() {
        return super.clear();
    }

    async create(guild, voice, channel, givenNode) {
        try {
            if (!voice) throw new Error('No voice channel was provided');
            if (!channel) throw new Error('No text channel was provided');
            if (!guild) throw new Error('No guild was provided');

            let dispatcher = this.get(guild.id);
            
            if (!dispatcher) {
                const node = givenNode || this.client.shoukaku.options.nodeResolver(this.client.shoukaku.nodes);
                
                if (!node) {
                    throw new Error('No available nodes found');
                }

                const player = await this.client.shoukaku.joinVoiceChannel({
                    guildId: guild.id,
                    channelId: voice.id,
                    shardId: guild.shard.id,
                    deaf: true,
                }).catch(error => {
                    throw new Error(`Failed to join voice channel: ${error.message}`);
                });

                dispatcher = new Dispatcher({
                    client: this.client,
                    guildId: guild.id,
                    channelId: channel.id,
                    voicechannelId: voice.id,
                    player,
                    node,
                });

                this.set(guild.id, dispatcher);
                this.client.shoukaku.emit('playerCreate', dispatcher.player);
            }

            return dispatcher;
        } catch (error) {
            console.error('Error creating queue:', error);
            throw error;
        }
    }

    async search(query) {
        try {
            if (!query) throw new Error('No search query provided');

            const node = this.client.shoukaku.options.nodeResolver(this.client.shoukaku.nodes);
            
            if (!node) {
                throw new Error('No available nodes found');
            }

            // Platform specific URL patterns
            const supportedPlatforms = {
                youtube: {
                    pattern: /^((?:https?:)?\/\/)?((?:www|m|music)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/,
                    prefix: 'yt'
                },
                spotify: {
                    pattern: /^((?:https?:)?\/\/)?(open\.)?spotify\.com\/(track|album|playlist)\/[a-zA-Z0-9]+/,
                    prefix: 'sp'
                },
                soundcloud: {
                    pattern: /^((?:https?:)?\/\/)?((?:www|m)\.)?(soundcloud\.com)\/[\w\-\/]+$/,
                    prefix: 'sc'
                }
            };

            let searchQuery = query;
            let isUrl = false;

            // Check if the query matches any supported platform URL pattern
            for (const [platform, { pattern, prefix }] of Object.entries(supportedPlatforms)) {
                if (pattern.test(query)) {
                    isUrl = true;
                    console.log(`Detected ${platform} URL:`, query);
                    break;
                }
            }

            // If not a URL, use search engine prefix
            if (!isUrl) {
                searchQuery = `${this.client.config.searchEngine || 'ytsearch'}:${query}`;
                console.log('Search query:', searchQuery);
            }

            // Perform the search
            const result = await node.rest.resolve(searchQuery).catch(error => {
                console.error('Search error:', error);
                throw new Error(`Search failed: ${error.message}`);
            });

            if (!result) {
                throw new Error('No results found');
            }

            // Add source information to results
            if (result.data) {
                if (Array.isArray(result.data)) {
                    result.data = result.data.map(track => ({
                        ...track,
                        source: this.determineSource(track.info.uri)
                    }));
                } else if (result.data.tracks) { // Handle playlist
                    result.data.tracks = result.data.tracks.map(track => ({
                        ...track,
                        source: this.determineSource(track.info.uri)
                    }));
                } else { // Handle single track
                    result.data.source = this.determineSource(result.data.info.uri);
                }
            }

            return result;
        } catch (error) {
            console.error('Search error:', error);
            return {
                loadType: 'ERROR',
                error: error.message
            };
        }
    }

    determineSource(uri) {
        if (/youtube\.com|youtu\.be/i.test(uri)) return 'youtube';
        if (/spotify\.com/i.test(uri)) return 'spotify';
        if (/soundcloud\.com/i.test(uri)) return 'soundcloud';
        return 'unknown';
    }

    // Helper method to validate URLs (can be used if needed)
    isValidUrl(str) {
        try {
            new URL(str);
            return true;
        } catch (e) {
            return false;
        }
    }
}