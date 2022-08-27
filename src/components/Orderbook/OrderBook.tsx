import { IOrder } from '@/interfaces';
import AskOrder from '@/components/AskOrder';
import BidOrder from '@/components/BidOrder';

interface IOrderBook {
    ask: IOrder[],
    bid:IOrder[],
}

function quantities(orders: IOrder[]) {
    return orders.reduce((total, order) => total + order.quantity, 0);
}

function OrderBook({ask, bid}: IOrderBook) {
    const totalAsks = quantities(ask);
    const totalBids = quantities(bid);

    const askOrders = ask.sort((a, b) => a.quantity > b.quantity ? -1 : 1);
    const bidOrders = bid.sort((a, b) => a.quantity > b.quantity ? -1 : 1);

    const Lines = []

    for(let i=0; i <10; i++) {
      if(askOrders[i] && bidOrders[i]) {
        askOrders[i].maxCumulative = totalAsks;
        bidOrders[i].maxCumulative = totalBids;
        Lines.push(<tr>
          <AskOrder key={`ask_${askOrders[i].price}_${i}`} {...askOrders[i]} />
          <BidOrder key={`bid_${bidOrders[i].price}_${i}`} {...bidOrders[i]} />
        </tr>)
      }
    }

    return (
        <div className="OrderBook">
          <table>
            <thead>
              <tr>
                <th>Quantidade de Vendas</th>
                <th>Preço de venda</th>
                <th>Preço de compra</th>
                <th>Quantidade de Compras</th>
              </tr>
            </thead>
            <tbody>
              <>
               {Lines}
              </>
            </tbody>
          </table>
        </div>
    )
}

export default OrderBook;
