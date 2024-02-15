using TestTask.Models;
using TestTask.Services.Interfaces;

namespace TestTask.Services
{
    public class TilesService : ITilesService
    {
        private readonly ILogger<TilesService> _logger;
        private List<List<int>> _tiles;

        public TilesService(ILogger<TilesService> logger)
        {
            _logger = logger;
        }

        public int GetCountParts(TilesRequestModel tilesRequestModel)
        {
            return CalculateParts(tilesRequestModel.Tiles);
        }

        public void SaveTiles(List<List<int>> tiles)
        {
            _tiles = tiles.ToList();
        }

        static int CalculateParts(List<List<int>> grid)
        {
            if (grid == null || grid.Count == 0 || grid[0].Count == 0)
                return 0;

            int parts = 0;
            bool[,] visited = new bool[grid.Count, grid[0].Count];

            for (int i = 0; i < grid.Count; i++)
            {
                for (int j = 0; j < grid[0].Count; j++)
                {
                    if (grid[i][j] == 0 && !visited[i, j])
                    {
                        DFS(grid, i, j, visited);
                        parts++;
                    }
                }
            }

            return parts;
        }

        static void DFS(List<List<int>> grid, int row, int col, bool[,] visited)
        {
            if (row < 0 || col < 0 || row >= grid.Count || col >= grid[0].Count || grid[row][col] == 1 || visited[row, col])
                return;

            visited[row, col] = true;

            // Перевірка сусідніх клітинок
            DFS(grid, row + 1, col, visited);
            DFS(grid, row - 1, col, visited);
            DFS(grid, row, col + 1, visited);
            DFS(grid, row, col - 1, visited);
        }
    }
}
