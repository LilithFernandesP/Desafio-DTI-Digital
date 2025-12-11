namespace ProductManager.models.entities
{
    public class Produto
    {
        public Guid Id { get; set; }
        public required string Nome { get; set; }
        public required string Descricao { get; set; }
        public required decimal Preco { get; set; }
        public string? Imagem { get; set; }
    }
}
