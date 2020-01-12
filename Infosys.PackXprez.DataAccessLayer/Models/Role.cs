using System;
using System.Collections.Generic;

namespace Infosys.PackXprez.DataAccessLayer.Models
{
    public partial class Role
    {
        public Role()
        {
            Customer = new HashSet<Customer>();
        }

        public int RoleId { get; set; }
        public string RoleName { get; set; }

        public ICollection<Customer> Customer { get; set; }
    }
}
