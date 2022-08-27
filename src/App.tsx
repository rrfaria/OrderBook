import { useEffect, useState } from 'react'
import useWebSocket, { ReadyState } from 'react-use-websocket';
import OrderBook from "@/components/Orderbook";
import { INewMessage } from "@/interfaces/Socket";
import currency from '@/utils/formater';
import './App.css'

interface OrdersProps {
  price: number
  quantity: number
}

interface ITables {
  orderBook10: () => void;
  instrument: () => void;
}

function App() {
  const [instrument, setInstrument] = useState('ETHUSD')
  const [currentPrice, setCurrentPrice] = useState('')
  const [askOrders, setAskOrders] = useState<OrdersProps[]>([])
  const [bidOrders, setBidOrders] = useState<OrdersProps[]>([])
  const { lastJsonMessage, readyState } = useWebSocket<INewMessage>(
    `${import.meta.env.VITE_SOCKET_URL}?subscribe=orderBook10:${instrument},instrument:${instrument}`,
  );

  useEffect(() => {
    if (lastJsonMessage) {

      const table: ITables = {
        orderBook10: () => {
          const data = lastJsonMessage.data[0];
          const asks = data?.asks?.map((ask) => ({
            price: ask[0],
            quantity: ask[1]
          }));

          const bids = data?.bids?.map((bid) => ({
            price: bid[0],
            quantity: bid[1]
          }));

          setAskOrders(asks)
          setBidOrders(bids)

        },
        instrument: () => {
          const data = lastJsonMessage.data[0];
          data.markPrice && setCurrentPrice(currency(data.markPrice as number))
        }
      }
      const selectedtable = lastJsonMessage?.table || ''
      const processMessage = table[selectedtable as keyof ITables]
      if(typeof processMessage === 'function') {
        processMessage()
      }
    }

  }, [lastJsonMessage]);

  return (
    <div className="App">
        <h1 className="instrument">{instrument} - {currentPrice}</h1>
        <OrderBook
          ask={askOrders}
          bid={bidOrders}
        />
    </div>
  )
}

export default App
