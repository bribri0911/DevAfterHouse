using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BotDiscord
{
    public class TaskItem
    {
        [JsonProperty("id")]
        public int Id { get; set; }

        [JsonProperty("titre")]
        public string Titre { get; set; }
    }
}
