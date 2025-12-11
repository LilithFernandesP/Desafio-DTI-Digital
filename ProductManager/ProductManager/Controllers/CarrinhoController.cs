using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProductManager.data;
using ProductManager.models.Dto;
using ProductManager.models.entities;

namespace ProductManager.Controllers
{
    [ApiController]
    // localhost:5290/Carrinho
    [Route("[controller]")]
    public class CarrinhoController : Controller
    {

        #region Inicialização
        private readonly ApplicationDbContext dbContext;

        public CarrinhoController(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }
        #endregion



        #region Finaliza carrinho e retorna os itens comprados

        [HttpPut("{carrinhoId}/finalizar")]
        public IActionResult FinalizarCarrinho(Guid carrinhoId)
        {
            Carrinho carrinho = dbContext.Carrinhos.Find(carrinhoId);

            if (carrinho == null)
            {
                return NotFound("Carrinho não encontrado.");
            }

            if (carrinho.Finalizado)
            {
                return BadRequest("Carrinho já finalizado.");
            }

            carrinho.Finalizado = true;
            dbContext.SaveChanges();

            return Ok(carrinho);
        }
        #endregion


        [HttpPost("Criar Carrinho")]
        public ActionResult<Carrinho> CriarCarrinho() // esse não precisa de Dto, pois só cria um carrinho vazio
        {
            Carrinho novoCarrinho = new Carrinho
            {
                Finalizado = false,
            };

            // Adiciona o carrinho à tabela de carrinhos
            dbContext.Carrinhos.Add(novoCarrinho);
            dbContext.SaveChanges();

            // Retorna o carrinho criado com o status de sucesso
            return Ok(novoCarrinho);
        }

        [HttpGet("{carrinhoId}")]
        public ActionResult<Carrinho> GetCarrinhoById(Guid carrinhoId)
        {
            var carrinho = dbContext.Carrinhos
                .Include(c => c.Itens) // Inclui os itens do carrinho
                .ThenInclude(ci => ci.Produto) // Inclui os detalhes do produto para cada item
                .FirstOrDefault(c => c.Id == carrinhoId);
            if (carrinho == null)
            {
                return NotFound("Carrinho não encontrado.");
            }
            return Ok(carrinho);
        }
    }
}
