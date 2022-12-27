import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import Slider from "@mui/material/Slider";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { FiltersType } from "./filtersType";
import { isCategory } from "./productListTypes";

interface FiltersProps {
  updateFilters: (filters: FiltersType) => void;
  filters: FiltersType;
  maxSliderValue: number;
}
export const Filters: React.FC<FiltersProps> = ({
  updateFilters,
  filters,
  maxSliderValue,
}) => {
  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    updateFilters({ ...filters, text: value });
  };
  const handleSelectChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!isCategory(event.target.value) && event.target.value !== "Tutti")
      return;
    updateFilters({ ...filters, category: event.target.value });
  };
  const handleSliderChange = (event: Event, value: number | number[]) => {
    if (!Array.isArray(value)) return;
    updateFilters({ ...filters, priceRange: value });
  };
  return (
    <>
      <Typography align="left">Filtra:</Typography>
      <TextField
        id="text"
        margin="dense"
        fullWidth
        onChange={handleTextChange}
        value={filters.text}
        data-testid="filters-text"
      />
      <Grid container spacing={2} alignItems="center">
        <Grid xs={4} item>
          <TextField
            id="category"
            select
            fullWidth
            margin="normal"
            required
            value={filters.category}
            data-testid="filters-category"
            onChange={handleSelectChange}
          >
            <MenuItem value="Svago">Svago</MenuItem>
            <MenuItem value="Ufficio">Ufficio</MenuItem>
            <MenuItem value="Casa">Casa</MenuItem>
            <MenuItem value="Tutti">Tutti</MenuItem>
          </TextField>
        </Grid>
        <Grid xs={8} item>
          <Slider
            size="medium"
            value={filters.priceRange}
            onChange={handleSliderChange}
            max={maxSliderValue}
            valueLabelDisplay="auto"
            data-testid="filters-price-slider"
          />
        </Grid>
      </Grid>
    </>
  );
};
