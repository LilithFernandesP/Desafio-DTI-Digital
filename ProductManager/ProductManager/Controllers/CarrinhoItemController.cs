using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProductManager.data;
using ProductManager.models.Dto;
using ProductManager.models.entities;

namespace ProductManager.Controllers
{
    [ApiController]
    // localhost:5290/CarrinhoItem
    [Route("[controller]")]
    public class CarrinhoItemController : Controller
    {

        #region Inicialização
        private readonly ApplicationDbContext dbContext;
        public CarrinhoItemController(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }
        #endregion

        #region Adicionar Produto ao Carrinho

        [HttpPost("{carrinhoId}")]
        public ActionResult<CarrinhoItem> AdicionarProdutoAoCarrinho(Guid carrinhoId, AdicionarCarrinhoItemDto adicionarCarrinhoItemDto)
        {
            Carrinho carrinho = dbContext.Carrinhos
                             .FirstOrDefault(c => c.Id == carrinhoId);


            if (carrinho == null)
            {
                return NotFound("Carrinho não encontrado.");
            }
            if(carrinho.Finalizado == true)
            {
                return BadRequest("Não é possível adicionar itens a um carrinho finalizado.");
            }
            #region Tratamento item já existe
            //Conferir se já existe esse item no carrinho
            CarrinhoItem itemExistente = dbContext.CarrinhoItens
                                         .FirstOrDefault(ci => ci.CarrinhoId == carrinhoId && ci.ProdutoId == adicionarCarrinhoItemDto.ProdutoId);

            //Já existe esse produto no carrinho então só atualizada a quantidade
            if (itemExistente != null)
            {
                itemExistente.Quantidade += adicionarCarrinhoItemDto.Quantidade;

                // quantidade menor que 1 remove o item do carrinho. 
                if (itemExistente.Quantidade < 1)
                {
                    dbContext.CarrinhoItens.Remove(itemExistente);
                }

                if (itemExistente.Quantidade > 10)
                {
                    itemExistente.Quantidade = 10;
                }
                // máximo 10. vou colocar essa condição aqui além do frontend para garantir a integridade dos dados.

                dbContext.SaveChanges();
                return Ok(itemExistente);
            }
            #endregion

            CarrinhoItem carrinhoItem = new CarrinhoItem()
            {
                CarrinhoId = carrinhoId,
                ProdutoId = adicionarCarrinhoItemDto.ProdutoId,
                Quantidade = adicionarCarrinhoItemDto.Quantidade,
                AdicionadoEm = DateTime.UtcNow
            };

            dbContext.CarrinhoItens.Add(carrinhoItem);
            dbContext.SaveChanges();

            return Ok(carrinhoItem);
        }
        #endregion

        #region atualizar quantidade do item no carrinho

        [HttpPut("itens/{id}")]
        public ActionResult<CarrinhoItem> AtualizarQuantidadeCarrinhoItem(Guid id, AtualizarQuantidadeDto dto)
        {
            // Encontra o item no carrinho pelo id
            CarrinhoItem itemExistente = dbContext.CarrinhoItens.FirstOrDefault(ci => ci.Id == id);
            if (itemExistente == null)
            {
                return NotFound("Item não encontrado no carrinho.");
            }

            itemExistente.Quantidade = dto.Quantidade;

            // Garantir que a quantidade não seja menor que 1 nem maior que 10
            if (itemExistente.Quantidade < 1)
            {
                dbContext.CarrinhoItens.Remove(itemExistente); // Remove o item se a quantidade for 0 ou menor
            }
            else if (itemExistente.Quantidade > 10)
            {
                itemExistente.Quantidade = 10;
            }

            dbContext.SaveChanges();

            return Ok(itemExistente);
        }

        #endregion

        #region Remover Item do Carrinho

        [HttpDelete("{carrinhoId}/itens/{itemId}")]
        public IActionResult RemoverProdutoDoCarrinho(Guid carrinhoId, Guid itemId)
        {
            CarrinhoItem item = dbContext.CarrinhoItens
                                .FirstOrDefault(ci => ci.CarrinhoId == carrinhoId && ci.Id == itemId);

            if (item == null)
            {
                return NotFound("Produto não encontrado no carrinho.");
            }

            dbContext.CarrinhoItens.Remove(item);
            dbContext.SaveChanges();

            return Ok(item);
        }
        #endregion

        #region retornar itens no carrinho

        [HttpGet("{carrinhoId}/itens")]
        public ActionResult<List<CarrinhoItem>> GetItensDoCarrinho(Guid carrinhoId)
        {
            Carrinho carrinho = dbContext.Carrinhos.Find(carrinhoId);

            if (carrinho == null)
            {
                return NotFound("Carrinho não encontrado.");
            }

            List<CarrinhoItem> itens = dbContext.CarrinhoItens
                                 .Where(ci => ci.CarrinhoId == carrinhoId)
                                 .Include(ci => ci.Produto)
                                 .ToList();

            return Ok(itens);
        }

        #endregion

    }
}
