export const StockServiceDescription = {
  url: 'https://stooq.com/q/l/?s=%STOCK%&f=sd2t2ohlcv&h&e=csv,',
};

export function getStockServiceUrl(parameter: string) {
  StockServiceDescription.url.replace('%STOCK%', parameter);
}
