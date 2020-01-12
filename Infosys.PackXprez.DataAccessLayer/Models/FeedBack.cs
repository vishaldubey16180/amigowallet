using System;
using System.Collections.Generic;

namespace Infosys.PackXprez.DataAccessLayer.Models
{
    public partial class FeedBack
    {
        public int SNo { get; set; }
        public int? CustId { get; set; }
        public string FeedBackType { get; set; }
        public string Comments { get; set; }

        public Customer Cust { get; set; }
    }
}
