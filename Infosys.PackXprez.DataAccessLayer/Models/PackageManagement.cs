using System;
using System.Collections.Generic;

namespace Infosys.PackXprez.DataAccessLayer.Models
{
    public partial class PackageManagement
    {
        public int? CustId { get; set; }
        public int TransactionId { get; set; }
        public decimal? Awbno { get; set; }
        public string CustomerName { get; set; }
        public string FromLocation { get; set; }
        public string ToAddress { get; set; }

        public Customer Cust { get; set; }
        public Package Transaction { get; set; }
    }
}
