using TestTask.Models;

namespace TestTask.Services.Interfaces
{
    public interface ITilesService
    {
        int GetCountParts(TilesRequestModel tilesRequestModel);

        public void SaveTiles(List<List<int>> tiles);

    }
}
