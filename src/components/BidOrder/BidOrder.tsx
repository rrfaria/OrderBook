import AbstractOrder from '@/components/AbstractOrder';
import currency from '@/utils/formater';

class BidOrder extends AbstractOrder {
  render() {
    return (
      <>
        <td className="fill-bid" style={{backgroundSize: this.getPercentage() + "% 100%"}}>
          {currency(this.props.price)}
        </td>
        <td>{this.props.quantity}</td>
      </>
    );
  }
}

export default BidOrder;
