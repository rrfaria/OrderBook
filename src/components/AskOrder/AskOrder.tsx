import AbstractOrder from '@/components/AbstractOrder';
import currency from '@/utils/formater';

class AskOrder extends AbstractOrder {
  render() {
    return (
      <>
        <td>{this.props.quantity}</td>
        <td className="fill-ask" style={{backgroundSize: this.getPercentage() + "% 100%"}}>
          {currency(this.props.price)}
        </td>
      </>
    );
  }
}

export default AskOrder;
