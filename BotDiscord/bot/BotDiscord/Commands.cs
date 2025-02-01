using Discord.Commands;
using System.Threading.Tasks;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System;
using System.Text;
using Discord;
using System.Text.RegularExpressions;
using DiscordRPC;
using System.Net.Http;

namespace BotDiscord
{
    public class Commands : ModuleBase<SocketCommandContext>
    {
        private static readonly HttpClient httpClient = new HttpClient();

        [Command("ping")]
        [Alias("pong")]
        [Summary("donne le ping du bot ``!!ping``")]
        [RequireUserPermission(Discord.GuildPermission.Administrator)]
        public async Task PingAsync()
        {
            int leping = Context.Client.Latency;
            await ReplyAsync($"le ping du bot est de : {leping}");
        }

        [Command("tasks")]
        [Summary("permet de savoir les tâches d'un user")]
        public async Task TaskAsync()
        {

            string apiUrl = "http://127.0.0.1:5000/api/users/2/tasks";

            try
            {
                var response = await httpClient.GetStringAsync(apiUrl);


                var taskResponse = JsonConvert.DeserializeObject<TaskApiResponse>(response);


                if (taskResponse?.Tasks != null && taskResponse.Tasks.Count > 0)
                {

                    var firstFiveTitles = taskResponse.Tasks.Take(5).Select(task => task.Titre);


                    string result = "Voici les 5 premières tâches :\n" + string.Join("\n", firstFiveTitles);

                    await ReplyAsync(result);
                }
                else
                {
                    await ReplyAsync("Aucune tâche trouvée.");
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Erreur lors de la récupération des tâches : " + ex.Message);
                await ReplyAsync("Erreur lors de la récupération des tâches.");
            }
        }



    }
}
