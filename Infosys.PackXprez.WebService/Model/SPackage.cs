using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Infosys.PackXprez.WebService.Model
{
    public class SPackage
    {
        public int CustId { get; set; }
        public string BuildingNo { get; set; }
        public string StreetNo { get; set; }
        public string Locality { get; set; }
        public decimal Pincode { get; set; }

        public string FromAddress { get; set; }
        public decimal ContactNo { get; set; }
    }
}
