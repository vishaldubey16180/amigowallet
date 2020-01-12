using System;
using System.Collections.Generic;

namespace Infosys.PackXprez.DataAccessLayer.Models
{
    public partial class Address
    {
        public int CustId { get; set; }
        public string BuildingNo { get; set; }
        public string StreetNo { get; set; }
        public string Locality { get; set; }
        public decimal Pincode { get; set; }
        public int? AddressId { get; set; }

        public Customer Cust { get; set; }
    }
}
