using System;
using System.Collections.Generic;

namespace Infosys.PackXprez.DataAccessLayer.Models
{
    public partial class Customer
    {
        public Customer()
        {
            Address = new HashSet<Address>();
            FeedBack = new HashSet<FeedBack>();
            Package = new HashSet<Package>();
            PackageManagement = new HashSet<PackageManagement>();
        }

        public int CustId { get; set; }
        public string Name { get; set; }
        public string Password { get; set; }
        public string EmailId { get; set; }
        public decimal? ContactNo { get; set; }
        public int RoleId { get; set; }

        public Role Role { get; set; }
        public ICollection<Address> Address { get; set; }
        public ICollection<FeedBack> FeedBack { get; set; }
        public ICollection<Package> Package { get; set; }
        public ICollection<PackageManagement> PackageManagement { get; set; }
    }
}
