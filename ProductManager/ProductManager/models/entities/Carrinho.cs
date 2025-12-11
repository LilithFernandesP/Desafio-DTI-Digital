namespace ProductManager.models.entities
{
    public class Carrinho
    {
        public Guid Id { get; set; }
        public DateTime DataCriacao { get; set; } 
        public bool Finalizado { get; set; }
        public ICollection<CarrinhoItem> Itens { get; set; }
        public Carrinho()
        {
            Itens = new List<CarrinhoItem>(); 
        }
    }
}
