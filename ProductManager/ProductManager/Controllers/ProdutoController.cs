using Microsoft.AspNetCore.Mvc;
using ProductManager.data;
using ProductManager.models.Dto;
using ProductManager.models.entities;
namespace ProductManager.Controllers
{
    [ApiController]
    // localhost:5290/Produto
    [Route("[controller]")]

    public class ProdutoController : Controller
    {

        #region Inicialização
        private readonly ApplicationDbContext dbContext;
        public ProdutoController(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }
        #endregion

        [HttpGet(Name = "GetProdutos")]
        public ActionResult<List<Produto>> GetProdutos()
        {
            try
            {
                var produtos = dbContext.Produtos.ToList();

                if (produtos == null || produtos.Count == 0)
                {
                    return NoContent();
                }

                return Ok(produtos);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Erro interno do servidor ao processar a solicitação.");
            }
        }

        [HttpPost]
        public ActionResult<Produto> CreateProduto(AdicionarProdutoDto adicionarProdutoDto)
        {
            Produto produto = new Produto()
            {
                Nome = adicionarProdutoDto.Nome,
                Descricao = adicionarProdutoDto.Descricao,
                Preco = adicionarProdutoDto.Preco
            };
            dbContext.Produtos.Add(produto);
            dbContext.SaveChanges();
            return Ok(produto);
        }

        [HttpGet("{id}")]
        public ActionResult<Produto> GetProdutoById(Guid id)
        {
            Produto produto = dbContext.Produtos.Find(id);

            if (produto == null)
            {
                return NotFound();
            }

            return Ok(produto);
        }
    }
}
