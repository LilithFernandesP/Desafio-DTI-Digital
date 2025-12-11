using System.Text.Json.Serialization;

namespace ProductManager.models.entities
{
    public class CarrinhoItem
    {
        public Guid Id { get; set; }
        public required Guid CarrinhoId { get; set; }
        [JsonIgnore]
        public  Carrinho Carrinho { get; set; }
        public required Guid ProdutoId { get; set; }
        [JsonIgnore]
        public  Produto Produto { get; set; } 
        public required int Quantidade { get; set; }
        public DateTime AdicionadoEm { get; set; }
    }
}
