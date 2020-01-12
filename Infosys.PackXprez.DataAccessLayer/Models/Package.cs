using System;
using System.Collections.Generic;

namespace Infosys.PackXprez.DataAccessLayer.Models
{
    public partial class Package
    {
        public int? CustId { get; set; }
        public decimal? Awbno { get; set; }
        public int Tid { get; set; }
        public string FromAddress { get; set; }
        public string ToAddress { get; set; }
        public string Status { get; set; }

        public Customer Cust { get; set; }
        public PackageManagement PackageManagement { get; set; }
    }
}
