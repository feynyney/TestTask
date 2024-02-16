using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
using TestTask.Models;
using TestTask.Services.Interfaces;

namespace TestTask.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TilesController : ControllerBase
    {
        private readonly ILogger<TilesController> _logger;
        private readonly ITilesService _tileService;

        public TilesController(ILogger<TilesController> logger, ITilesService tilesService)
        {
            _logger = logger;
            _tileService = tilesService;
        }

        [HttpPost("UpdateField")]
        public ActionResult<TilesResponseModel> OnPageUpdate(TilesRequestModel tilesRequest)
        {
            //написати валідацію (повертати статус коди)
            //Вкладені лісти мають бути однакового розміру
            //Якщо не 1 або 0 => bad request
            //Якщо поле менше 3х3 => bad request
            //

            //validate matrix size
            if (tilesRequest.Tiles.Count < 2 || tilesRequest.Tiles[0].Count < 2) 
            {
                return BadRequest("Matrix cannot be less then 2x2!");
            }

            //validate whether matrix has wrong values and same size lists

            for (int i = 0; i < tilesRequest.Tiles.Count; i++)
            {
                for (int j = 0; j < tilesRequest.Tiles[i].Count; j++)
                {
                    if (tilesRequest.Tiles[i][j] != 0 && tilesRequest.Tiles[i][j] != 1)
                    {
                        return BadRequest("Matrix only applies 0 or 1 as a value!");
                    }
                }

                if (tilesRequest.Tiles[i].Count != tilesRequest.Tiles[0].Count)
                {
                    return BadRequest("Matrix rows must be the same size!");
                }
            }  

            _tileService.SaveTiles(tilesRequest.Tiles);

            int partsCount = _tileService.GetCountParts(tilesRequest);

            var result = new TilesResponseModel()
            {
                Tiles = tilesRequest.Tiles,
                CountParts = partsCount
            };

            return Ok(result);
        }
    }
}
