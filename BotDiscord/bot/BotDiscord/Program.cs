using System;
using System.Reflection;
using System.Threading.Tasks;
using Discord;
using Discord.Commands;
using Discord.WebSocket;

namespace BotDiscord
{
    internal class Program
    {
        private static readonly string _token = "Montoken";

        private static CommandService commands;
        private static DiscordSocketClient client;

        static void Main(string[] args) => RunBotAsync().GetAwaiter().GetResult();

        public static async Task RunBotAsync()
        {

            client = new DiscordSocketClient(new DiscordSocketConfig
            {
                LogLevel = LogSeverity.Debug,
                GatewayIntents = GatewayIntents.All
            });

            commands = new CommandService();

            client.Log += Log;

            client.Ready += OnReady;

            await InstallCommandsAsync();
            await client.LoginAsync(TokenType.Bot, _token);
            await client.StartAsync();

            await Task.Delay(-1);

        }
        public static async Task InstallCommandsAsync()
        {
            client.MessageReceived += HandleCommandAsync;
            await commands.AddModulesAsync(Assembly.GetEntryAssembly(), null);
        }


        private static async Task HandleCommandAsync(SocketMessage msg)
        {
            var message = (SocketUserMessage)msg;

            if (message == null || message.Author.IsBot) return;

            int argPos = 0;


            Console.WriteLine(message.Content);

            if (message.Channel is IDMChannel) return;


            if (!message.HasStringPrefix("!!", ref argPos))
            {
                return;
            }

            var context = new SocketCommandContext(client, message);

            var result = await commands.ExecuteAsync(context, argPos, null);


            if (!result.IsSuccess)
                await context.Channel.SendMessageAsync(result.ErrorReason);


        }


        private static Task Log(LogMessage arg)
        {
            Console.ForegroundColor = ConsoleColor.Green;
            Console.WriteLine(arg);
            Console.ForegroundColor = ConsoleColor.White;
            return Task.CompletedTask;
        }

        private static Task OnReady()
        {
            Console.WriteLine("Bot is connected!");
            return Task.CompletedTask;
        }

        


    }
}
