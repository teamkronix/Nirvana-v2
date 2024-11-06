import Event from "../../../Structures/Event.structure.js";
import { Emoji } from "../../../utils/Emotes.utils.js";
import { 
    ActionRowBuilder, 
    StringSelectMenuBuilder, 
    PermissionFlagsBits,
    EmbedBuilder 
} from "discord.js";

export default class TrackStart extends Event {
    constructor(client, file) {
        super(client, file, {
            name: "trackStart",
        });
    }

    createPlayerEmbed(track, client) {
        const duration = track.info.length ? this.formatDuration(track.info.length) : 'LIVE';
        
        return new EmbedBuilder()
            .setAuthor({
                name: "Now Playing",
                iconURL: client.user.displayAvatarURL()
            })
            .setTitle(track.info.title)
            .setURL(track.info.uri)
            .setColor("#2f3136")
            .addFields([
                { name: "Requested By", value: `${track.info.requester}`, inline: true },
                { name: "Duration", value: duration, inline: true },
                { name: "Author", value: track.info.author, inline: true }
            ])
            .setFooter({
                text: `Powered by Nirvana Music`,
                iconURL: client.user.displayAvatarURL()
            })
            .setTimestamp();
    }

    formatDuration(ms) {
        const seconds = Math.floor((ms / 1000) % 60);
        const minutes = Math.floor((ms / (1000 * 60)) % 60);
        const hours = Math.floor(ms / (1000 * 60 * 60));

        return hours > 0 
            ? `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
            : `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }

    createButtonRows(isPaused = false) {
        const controlButtons = isPaused ? this.createResumeButtons() : this.createPauseButtons();
        const utilityButtons = this.createUtilityButtons();

        return [
            { type: 1, components: controlButtons },
            { type: 1, components: utilityButtons }
        ];
    }

    createPauseButtons() {
        return [
            {
                type: 2,
                style: 2,
                emoji: Emoji.shuffle,
                custom_id: "shuffle"
            },
            {
                type: 2,
                style: 2,
                emoji: Emoji.previous,
                custom_id: "previous"
            },
            {
                type: 2,
                style: 2,
                emoji: Emoji.pause,
                custom_id: "pause"
            },
            {
                type: 2,
                style: 2,
                emoji: Emoji.skip,
                custom_id: "skip"
            },
            {
                type: 2,
                style: 2,
                emoji: Emoji.loop,
                custom_id: "loop"
            }
        ];
    }

    createResumeButtons() {
        return [
            {
                type: 2,
                style: 2,
                emoji: Emoji.shuffle,
                custom_id: "shuffle"
            },
            {
                type: 2,
                style: 2,
                emoji: Emoji.previous,
                custom_id: "previous"
            },
            {
                type: 2,
                style: 3,
                emoji: Emoji.resume,
                custom_id: "resume"
            },
            {
                type: 2,
                style: 2,
                emoji: Emoji.skip,
                custom_id: "skip"
            },
            {
                type: 2,
                style: 2,
                emoji: Emoji.loop,
                custom_id: "loop"
            }
        ];
    }

    createUtilityButtons() {
        return [
            {
                type: 2,
                style: 4,
                emoji: Emoji.stop,
                custom_id: "stop"
            },
            {
                type: 2,
                style: 2,
                label: "Quick Filters",
                emoji: Emoji.Qfilters,
                custom_id: "filter"
            },
            {
                type: 2,
                style: 3,
                emoji: "🤍",
                custom_id: "like"
            }
        ];
    }

    createFilterMenu() {
        return new ActionRowBuilder().addComponents(
            new StringSelectMenuBuilder()
                .setCustomId("f")
                .setPlaceholder("Select Filters")
                .addOptions([
                    {
                        label: "Reset Filters",
                        description: "Clears all filters.",
                        value: "reset"
                    },
                    {
                        label: "8D",
                        description: "Sets the 8D Filter.",
                        value: "8"
                    },
                    {
                        label: "BassBoost",
                        description: "Sets the BassBoost Filter.",
                        value: "bb"
                    },
                    {
                        label: "Distortion",
                        description: "Sets the distortion Filter.",
                        value: "d"
                    },
                    {
                        label: "Karaoke",
                        description: "Sets the Karaoke Filter.",
                        value: "k"
                    },
                    {
                        label: "Lofi",
                        description: "Sets the Lofi Filter.",
                        value: "l"
                    },
                    {
                        label: "NightCore",
                        description: "Sets the NightCore Filter.",
                        value: "nc"
                    },
                    {
                        label: "Pitch",
                        description: "Sets the Pitch Filter.",
                        value: "p"
                    },
                    {
                        label: "Rate",
                        description: "Sets the Rate Filter.",
                        value: "ra"
                    },
                    {
                        label: "Rotation",
                        description: "Sets the Rotation Filter.",
                        value: "ro"
                    },
                    {
                        label: "Speed",
                        description: "Sets the Speedy Filter.",
                        value: "s"
                    },
                    {
                        label: "Tremolo",
                        description: "Sets the Tremolo Filter.",
                        value: "t"
                    },
                    {
                        label: "Vibrato",
                        description: "Sets the Vibrato Filter.",
                        value: "v"
                    }
                ])
        );
    }

    async run(_player, track, dispatcher) {
        const player = this.client.queue.get(_player.guildId);
        const guild = await this.client.guilds.fetch(_player.guildId);
        const vcId = guild.members.me.voice.channelId;
        const channel = guild.channels.cache.get(dispatcher.channelId);

        if (!channel) return;

        // Create the player embed
        const PlayerEmbed = this.createPlayerEmbed(track, this.client);

        // Set image based on permissions
        if (guild.members.me.permissionsIn(channel).has(PermissionFlagsBits.AttachFiles)) {
            PlayerEmbed.setImage("attachment://nirvanamusic.png");
        } else {
            PlayerEmbed.setThumbnail(track.info.artworkUrl);
        }

        // Send initial message with components
        const message = await channel.send({
            embeds: [PlayerEmbed],
            components: this.createButtonRows(false)
        });

        dispatcher.nowPlayingMessage = message;

        // Create collector for button interactions
        const collector = message.createMessageComponentCollector({
            filter: (b) => {
                if (b.guild.members.me.voice.channel && 
                    b.guild.members.me.voice.channelId === b.member.voice.channelId) {
                    return true;
                }
                
                b.reply({
                    content: `You Are Not Connected To <#${b.guild.members.me.voice?.channelId ?? "None"}> To Use This Command.`,
                    ephemeral: true
                });
                return false;
            }
        });

        collector.on("collect", async (interaction) => {
            await interaction.deferReply({ ephemeral: true });

            switch (interaction.customId) {
                case "previous":
                    if (dispatcher.previous) {
                        dispatcher.previousTrack();
                        await interaction.editReply({ content: "Rewinded the player!" });
                    } else {
                        await interaction.editReply({ content: "No previous song available!" });
                    }
                    break;

                case "pause":
                case "resume":
                    dispatcher.pause();
                    await interaction.editReply({
                        content: dispatcher.paused ? "Paused the music!" : "Resumed the music!"
                    });
                    await message.edit({
                        components: this.createButtonRows(dispatcher.paused)
                    });
                    break;

                case "skip":
                    if (dispatcher.queue.length) {
                        dispatcher.skip();
                        await interaction.editReply({ content: "Skipped the Song!" });
                    } else {
                        await interaction.editReply({ content: "No more songs in queue!" });
                    }
                    break;

                case "like":
                    await interaction.editReply({
                        embeds: [
                            new EmbedBuilder()
                                .setAuthor({
                                    name: "Nirvana Music",
                                    iconURL: this.client.user.displayAvatarURL()
                                })
                                .setDescription(`Added **${track.info.title}** To **Liked Songs** 🤍`)
                        ]
                    });
                    break;

                case "stop":
                    dispatcher.destroy();
                    await interaction.editReply({ content: "Stopped the music & cleared the queue!" });
                    await message.delete();
                    break;

                case "loop":
                    const loopStates = {
                        off: ["repeat", "Track"],
                        repeat: ["queue", "Queue"],
                        queue: ["off", "Disabled"]
                    };
                    const [nextState, displayText] = loopStates[dispatcher.loop];
                    dispatcher.loop = nextState;
                    await interaction.editReply({
                        content: `Alright, I've ${displayText === "Disabled" ? "**Disabled**" : `will be looping the **${displayText}**`}!`
                    });
                    break;

                case "filter":
                    await interaction.editReply({
                        content: `<@${interaction.user.id}> Select your favourite **Filters**`,
                        embeds: [
                            new EmbedBuilder()
                                .setFooter({
                                    text: "Powered by Nirvana Music",
                                    iconURL: this.client.user.displayAvatarURL()
                                })
                        ],
                        components: [this.createFilterMenu()]
                    });
                    break;

                case "shuffle":
                    dispatcher.setShuffle();
                    await interaction.editReply({ content: "Shuffling the Queue!" });
                    break;
            }
        });
    }
}