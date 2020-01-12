using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Infosys.PackXprez.WebService.Model
{
    public class SCustomer
    {
        public int CustId { get; set; }
        public string Name { get; set; }
        public string Password { get; set; }
        public string EmailId { get; set; }
        public decimal? ContactNo { get; set; }
        public int RoleId { get; set; }
    }
}
