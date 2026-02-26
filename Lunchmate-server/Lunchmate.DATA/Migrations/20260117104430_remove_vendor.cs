using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Lunchmate.DATA.Migrations
{
    /// <inheritdoc />
    public partial class remove_vendor : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Orders_Vendors_VendorID",
                table: "Orders");

            migrationBuilder.DropIndex(
                name: "IX_Orders_VendorID",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "VendorID",
                table: "Orders");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "VendorID",
                table: "Orders",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_Orders_VendorID",
                table: "Orders",
                column: "VendorID");

            migrationBuilder.AddForeignKey(
                name: "FK_Orders_Vendors_VendorID",
                table: "Orders",
                column: "VendorID",
                principalTable: "Vendors",
                principalColumn: "VendorID",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
