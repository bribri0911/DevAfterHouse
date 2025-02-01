using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BotDiscord
{
    public class TaskApiResponse
    {
        [JsonProperty("tasks")]
        public List<TaskItem> Tasks { get; set; }
    }
}
