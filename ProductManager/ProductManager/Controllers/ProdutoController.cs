using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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

        #region Retorna uma lista com todos os produtos do banco
        [HttpGet]
        public ActionResult<List<Produto>> GetProdutos([FromQuery] string? query)
        {
            try
            {
                IQueryable<Produto> produtosQuery = dbContext.Produtos.AsQueryable();

                if (!string.IsNullOrWhiteSpace(query))
                {
                    produtosQuery = produtosQuery
                        .Where(p => EF.Functions.Like(p.Nome, $"%{query}%"));
                }

                List<Produto> produtos = produtosQuery.ToList();

                if (produtos.Count == 0)
                {
                    return NoContent();
                }

                return Ok(produtos);
            }
            catch
            {
                return StatusCode(500, "Erro ao pegar os produtos.");
            }
        }
        #endregion

        #region Criar um produto
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
        #endregion

        #region  retorna um produto específico pela pesquisa de id
        
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
        #endregion
    }
}
