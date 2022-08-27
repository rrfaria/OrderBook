import { Component } from 'react';
import { IOrder } from '@/interfaces';

abstract class AbstractOrder extends Component<IOrder> {

  getPercentage() {
    const { maxCumulative, quantity } = this.props;
    let fillPercentage = (maxCumulative ? quantity / maxCumulative : 0) * 100;
    fillPercentage = Math.min(fillPercentage, 100); // Percentage can't be greater than 100%
    fillPercentage = Math.max(fillPercentage, 0); // Percentage can't be smaller than 0%
    return fillPercentage;
  }
}

export default AbstractOrder;
