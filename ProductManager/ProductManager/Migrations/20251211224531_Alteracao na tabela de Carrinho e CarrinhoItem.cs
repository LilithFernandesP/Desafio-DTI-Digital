using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ProductManager.Migrations
{
    /// <inheritdoc />
    public partial class AlteracaonatabeladeCarrinhoeCarrinhoItem : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CarrinhoItems_Carrinhos_CarrinhoId",
                table: "CarrinhoItems");

            migrationBuilder.DropForeignKey(
                name: "FK_CarrinhoItems_Produtos_ProdutoId",
                table: "CarrinhoItems");

            migrationBuilder.DropPrimaryKey(
                name: "PK_CarrinhoItems",
                table: "CarrinhoItems");

            migrationBuilder.RenameTable(
                name: "CarrinhoItems",
                newName: "CarrinhoItens");

            migrationBuilder.RenameIndex(
                name: "IX_CarrinhoItems_ProdutoId",
                table: "CarrinhoItens",
                newName: "IX_CarrinhoItens_ProdutoId");

            migrationBuilder.RenameIndex(
                name: "IX_CarrinhoItems_CarrinhoId",
                table: "CarrinhoItens",
                newName: "IX_CarrinhoItens_CarrinhoId");

            migrationBuilder.AddColumn<DateTime>(
                name: "DataCriacao",
                table: "Carrinhos",
                type: "TEXT",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<bool>(
                name: "Finalizado",
                table: "Carrinhos",
                type: "INTEGER",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<DateTime>(
                name: "AdicionadoEm",
                table: "CarrinhoItens",
                type: "TEXT",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddPrimaryKey(
                name: "PK_CarrinhoItens",
                table: "CarrinhoItens",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_CarrinhoItens_Carrinhos_CarrinhoId",
                table: "CarrinhoItens",
                column: "CarrinhoId",
                principalTable: "Carrinhos",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_CarrinhoItens_Produtos_ProdutoId",
                table: "CarrinhoItens",
                column: "ProdutoId",
                principalTable: "Produtos",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CarrinhoItens_Carrinhos_CarrinhoId",
                table: "CarrinhoItens");

            migrationBuilder.DropForeignKey(
                name: "FK_CarrinhoItens_Produtos_ProdutoId",
                table: "CarrinhoItens");

            migrationBuilder.DropPrimaryKey(
                name: "PK_CarrinhoItens",
                table: "CarrinhoItens");

            migrationBuilder.DropColumn(
                name: "DataCriacao",
                table: "Carrinhos");

            migrationBuilder.DropColumn(
                name: "Finalizado",
                table: "Carrinhos");

            migrationBuilder.DropColumn(
                name: "AdicionadoEm",
                table: "CarrinhoItens");

            migrationBuilder.RenameTable(
                name: "CarrinhoItens",
                newName: "CarrinhoItems");

            migrationBuilder.RenameIndex(
                name: "IX_CarrinhoItens_ProdutoId",
                table: "CarrinhoItems",
                newName: "IX_CarrinhoItems_ProdutoId");

            migrationBuilder.RenameIndex(
                name: "IX_CarrinhoItens_CarrinhoId",
                table: "CarrinhoItems",
                newName: "IX_CarrinhoItems_CarrinhoId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_CarrinhoItems",
                table: "CarrinhoItems",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_CarrinhoItems_Carrinhos_CarrinhoId",
                table: "CarrinhoItems",
                column: "CarrinhoId",
                principalTable: "Carrinhos",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_CarrinhoItems_Produtos_ProdutoId",
                table: "CarrinhoItems",
                column: "ProdutoId",
                principalTable: "Produtos",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
