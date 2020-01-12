using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Infosys.PackXprez.WebService.Model
{
    public class Mpackage
    {

        public int? CustId { get; set; }
        public decimal? Awbno { get; set; }
        public int Tid { get; set; }
        public string FromAddress { get; set; }
        public string ToAddress { get; set; }
        public string Status { get; set; }
    }
}
