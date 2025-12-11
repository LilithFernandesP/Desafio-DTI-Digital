using ProductManager.models.entities;

namespace ProductManager.models.Dto
{
    public class AdicionarCarrinhoItemDto
    {
        public required Guid ProdutoId { get; set; }
        public required int Quantidade { get; set; }

    }
}
