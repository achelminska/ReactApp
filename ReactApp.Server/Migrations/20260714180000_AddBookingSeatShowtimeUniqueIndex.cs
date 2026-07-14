using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ReactApp.Server.Migrations
{
    /// <inheritdoc />
    public partial class AddBookingSeatShowtimeUniqueIndex : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ShowtimeId",
                table: "BookingSeats",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.Sql(
                """
                UPDATE BookingSeats
                SET ShowtimeId = (
                    SELECT ShowtimeId FROM Bookings WHERE Bookings.Id = BookingSeats.BookingId
                );
                """);

            migrationBuilder.CreateIndex(
                name: "IX_BookingSeats_ShowtimeId_Row_SeatNumber",
                table: "BookingSeats",
                columns: new[] { "ShowtimeId", "Row", "SeatNumber" },
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_BookingSeats_ShowtimeId_Row_SeatNumber",
                table: "BookingSeats");

            migrationBuilder.DropColumn(
                name: "ShowtimeId",
                table: "BookingSeats");
        }
    }
}
