using System;
using System.IO;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.Extensions.Configuration;

namespace Infosys.PackXprez.DataAccessLayer.Models
{
    public partial class PackXprezDBContext : DbContext
    {
        public PackXprezDBContext()
        {
        }

        public PackXprezDBContext(DbContextOptions<PackXprezDBContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Address> Address { get; set; }
        public virtual DbSet<Customer> Customer { get; set; }
        public virtual DbSet<FeedBack> FeedBack { get; set; }
        public virtual DbSet<GenerateAwb> GenerateAwb { get; set; }
        public virtual DbSet<Package> Package { get; set; }
        public virtual DbSet<PackageManagement> PackageManagement { get; set; }
        public virtual DbSet<Role> Role { get; set; }
        public virtual DbSet<Service> Service { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                var builder = new ConfigurationBuilder()
                       .SetBasePath(Directory.GetCurrentDirectory())
                       .AddJsonFile("appsettings.json");
                var config = builder.Build();
                var connectionString = config.GetConnectionString("PackXprezDBConnectionString");

                optionsBuilder.UseSqlServer("Data Source =(localdb)\\MSSQLLocalDB;Initial Catalog=PackXprezDB;Integrated Security=true");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasDbFunction(() => PackXprezDBContext.LoginUser(default(string),default(string)));
            modelBuilder.HasDbFunction(() => PackXprezDBContext.CheckService(default(decimal), default(decimal)));
            modelBuilder.HasDbFunction(() => PackXprezDBContext.TrackStatus(default(decimal)));
            modelBuilder.Entity<Address>(entity =>
            {
                entity.HasKey(e => new { e.CustId, e.BuildingNo, e.StreetNo, e.Locality, e.Pincode });

                entity.Property(e => e.BuildingNo)
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.Property(e => e.StreetNo)
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.Property(e => e.Locality)
                    .HasMaxLength(25)
                    .IsUnicode(false);

                entity.Property(e => e.Pincode).HasColumnType("numeric(6, 0)");

                entity.HasOne(d => d.Cust)
                    .WithMany(p => p.Address)
                    .HasForeignKey(d => d.CustId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Address__CustId__33D4B598");
            });

            modelBuilder.Entity<Customer>(entity =>
            {
                entity.HasKey(e => e.CustId);

                entity.HasIndex(e => e.EmailId)
                    .HasName("UQ__Customer__7ED91ACE7A283A2E")
                    .IsUnique();

                entity.Property(e => e.ContactNo).HasColumnType("numeric(10, 0)");

                entity.Property(e => e.EmailId)
                    .IsRequired()
                    .HasMaxLength(40)
                    .IsUnicode(false);

                entity.Property(e => e.Name)
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.Property(e => e.Password)
                    .IsRequired()
                    .HasMaxLength(16)
                    .IsUnicode(false);

                entity.HasOne(d => d.Role)
                    .WithMany(p => p.Customer)
                    .HasForeignKey(d => d.RoleId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Customer__RoleId__34C8D9D1");
            });

            modelBuilder.Entity<FeedBack>(entity =>
            {
                entity.HasKey(e => e.SNo);

                entity.Property(e => e.SNo).HasColumnName("S_No");

                entity.Property(e => e.Comments)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.FeedBackType)
                    .HasColumnName("FeedBack Type")
                    .HasMaxLength(15)
                    .IsUnicode(false);

                entity.HasOne(d => d.Cust)
                    .WithMany(p => p.FeedBack)
                    .HasForeignKey(d => d.CustId)
                    .HasConstraintName("FK__FeedBack__CustId__35BCFE0A");
            });

            modelBuilder.Entity<GenerateAwb>(entity =>
            {
                entity.HasKey(e => e.Awbnumber);

                entity.ToTable("GenerateAWB");

                entity.Property(e => e.Awbnumber)
                    .HasColumnName("AWBNumber")
                    .HasColumnType("numeric(12, 0)")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.Tid)
                    .HasColumnName("TID")
                    .HasColumnType("numeric(12, 0)");
            });

            modelBuilder.Entity<Package>(entity =>
            {
                entity.HasKey(e => e.Tid);

               

                entity.Property(e => e.Tid).HasColumnName("TID");

                entity.Property(e => e.Awbno)
                    .HasColumnName("AWBNo")
                    .HasColumnType("numeric(10, 0)");

                entity.Property(e => e.FromAddress)
                    .HasColumnName("fromAddress")
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.Status)
                    .HasColumnName("status")
                    .HasMaxLength(25)
                    .IsUnicode(false);

                entity.Property(e => e.ToAddress)
                    .HasColumnName("toAddress")
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.HasOne(d => d.Cust)
                    .WithMany(p => p.Package)
                    .HasForeignKey(d => d.CustId)
                    .HasConstraintName("FK__Package__CustId__36B12243");
            });

            modelBuilder.Entity<PackageManagement>(entity =>
            {
                entity.HasKey(e => e.TransactionId);

                entity.Property(e => e.TransactionId).ValueGeneratedNever();

                entity.Property(e => e.Awbno)
                    .HasColumnName("AWBNo")
                    .HasColumnType("numeric(12, 0)");

                entity.Property(e => e.CustomerName)
                    .HasMaxLength(30)
                    .IsUnicode(false);

                entity.Property(e => e.FromLocation)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.ToAddress)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.HasOne(d => d.Cust)
                    .WithMany(p => p.PackageManagement)
                    .HasForeignKey(d => d.CustId)
                    .HasConstraintName("FK__PackageMa__CustI__49C3F6B7");

                entity.HasOne(d => d.Transaction)
                    .WithOne(p => p.PackageManagement)
                    .HasForeignKey<PackageManagement>(d => d.TransactionId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__PackageMa__Trans__4AB81AF0");
            });

            modelBuilder.Entity<Role>(entity =>
            {
                entity.Property(e => e.RoleId).ValueGeneratedNever();

                entity.Property(e => e.RoleName)
                    .HasMaxLength(20)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Service>(entity =>
            {
                entity.HasKey(e => new { e.FromPincode, e.ToPincode });

                entity.Property(e => e.FromPincode)
                    .HasColumnName("From_Pincode")
                    .HasColumnType("numeric(6, 0)");

                entity.Property(e => e.ToPincode)
                    .HasColumnName("To_Pincode")
                    .HasColumnType("numeric(6, 0)");
            });     
        }

        [DbFunction("ufn_Login", "dbo")]
        public static int LoginUser(string emailId,string password)
        {
            return 0;
        }
        [DbFunction("ufn_CheckAvailability", "dbo")]
        public static int CheckService(decimal From_Pincode,decimal To_Pincode)
        {
            return 0;
        }

        [DbFunction("ufn_TrackStatus","dbo")]
        public static string TrackStatus(decimal AwbNo)
        {
            return null;
        }
    }
}
