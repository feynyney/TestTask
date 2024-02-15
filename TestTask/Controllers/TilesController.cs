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

        [HttpPost]
        public ActionResult<TilesResponseModel> test(TilesRequestModel tilesRequest)
        {
            //написати валідацію (повертати статус коди)
            //Вкладені лісти мають бути однакового розміру
            //Якщо не 1 або 0 => bad request
            //Якщо поле менше 3х3 => bad request
            //

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
