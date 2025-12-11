namespace ProductManager.models.Dto
{
    public class AdicionarProdutoDto
    {
        public required string Nome { get; set; }
        public required string Descricao { get; set; }
        public required decimal Preco { get; set; }
        public string? Imagem { get; set; }
    }
}
