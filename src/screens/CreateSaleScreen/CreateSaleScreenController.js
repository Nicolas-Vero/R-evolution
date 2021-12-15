import { get_coach_offers } from '../../api/Offers';
import { add_manual_payment, add_transaction } from '../../api/Coach';
import {
  get_payment_details,
  remove_paiement,
  update_paiement,
} from '../../api/Paiement';
import AbstractScreenController from '../../components/abstracts/AbstractScreen/AbstractScreenController';
import moment from 'moment';
import 'moment/locale/fr';
moment.locale('fr');
export default class CreateSaleScreenController extends AbstractScreenController {
  constructor(component) {
    super(component);

    this.initialState = {
      today: moment(),
      Offer: [],
      date: '',
      nextPayment: [],
      oldPayment: [],
      loaded: false,
      offer_id: '',
      transaction_id: Math.floor(Math.random() * 1000),
      isCreation: this.component.props.navigation.state.params?.isCreation,
      selectedOffer: null,
      selectedItem: null,
      inputDate: '',
      selectedSaleType: null,
      addPrice: null,
      totalPrice: 0,
      isDeleteSaleVisible: false,
      isValidateSaleDialogVisible: false,
      item: this.component.props.navigation.state.params.item,
    };
  }
  componentDidMount = async () => {
    const { item, today } = this.component.state;
    if (item && item.id) {
      const paymentDetail = await get_payment_details(item.id);
      if (paymentDetail.status === 200) {
        const oldPayment = [];
        const nextPayment = [];
        let totalPrice = 0;
        paymentDetail.data.forEach((payment) => {
          if (moment(payment.date).isAfter(moment())) nextPayment.push(payment);
          else oldPayment.push(payment);

          totalPrice += parseFloat(payment.amount);
        });

        this.component.setState({ totalPrice: totalPrice });
        this.component.setState({ nextPayment, oldPayment });
      }
      this.component.setState({ loaded: true });

      return;
    }
    get_coach_offers()
      .then((res) => {
        this.component.setState({ Offer: res.data.offers });
      })
      .then(() => {
        this.component.setState({ loaded: true });
      });
  };

  onAddPaiement = () => {
    const {
      today,
      selectedSaleType,
      inputDate,
      addPrice,
      oldPayment,
      nextPayment,
      totalPrice,
    } = this.component.state;
    const date = moment(inputDate, 'DD/MM/YYYY').format('DD/MM/YYYY');
    const installments = oldPayment.length + nextPayment.length;
    const newPaiement = {
      amount: addPrice,
      installments: installments + 1,
      mode: selectedSaleType,
      date: date,
    };
    if (date > moment().format('DD/MM/YYYY')) {
      this.component.setState({
        nextPayment: [...nextPayment, newPaiement],
        addPrice: null,
        inputDate: '',
        totalPrice: totalPrice + parseFloat(addPrice),
      });

      return;
    }

    this.component.setState({
      oldPayment: [...oldPayment, newPaiement],
      addPrice: null,
      inputDate: '',
      totalPrice: totalPrice + parseFloat(addPrice),
    });

    return;
  };

  onChangeOffer = (item) => {
    const { selectedOffer } = this.component.state;
    if (selectedOffer && selectedOffer.id !== item.id) {
      this.component.setState({
        oldPayment: [],
        nextPayment: [],
      });
    }
    this.component.setState({ selectedOffer: item });
  };

  onChangePrice(price) {
    this.component.setState({ addPrice: price });
  }

  openValidateSaleDialog = (item) => {
    this.component.setState({
      selectedItem: item,
      isValidateSaleDialogVisible: true,
    });
  };

  onDismissValidateSaleDialog = () => {
    this.component.setState({
      isValidateSaleDialogVisible:
        !this.component.state.isValidateSaleDialogVisible,
      selectedItem: null,
    });
  };

  onValidateSale = () => {
    const { oldPayment, selectedItem, nextPayment } = this.component.state;
    const othersSale = nextPayment.filter((item) => item !== selectedItem);
    selectedItem.date = moment().format('DD/MM/YYYY');

    this.component.setState({
      oldPayment: [...oldPayment, selectedItem],
      nextPayment: othersSale,
    });

    this.onDismissValidateSaleDialog();
  };

  openDeleteSaleDialog = (item) => {
    this.component.setState({
      selectedItem: item,
      isDeleteSaleVisible: true,
    });
  };

  onDismissDeleteSaleDialog = () => {
    remove_paiement(this.component.state.selectedItem);
    this.component.setState({
      isDeleteSaleVisible: !this.component.state.isDeleteSaleVisible,
      selectedItem: null,
    });
  };

  onDeleteSale = () => {
    const { oldPayment, nextPayment, selectedItem, totalPrice } =
      this.component.state;
    this.component.setState({
      oldPayment: oldPayment.filter((item) => item !== selectedItem),
      nextPayment: nextPayment.filter((item) => item !== selectedItem),
      totalPrice: totalPrice - parseFloat(selectedItem.amount),
    });

    this.onDismissDeleteSaleDialog();
  };

  onUpdate = async () => {
    const { item, oldPayment, nextPayment, totalPrice } = this.component.state;
    const athleteId = item.athlete.id;
    const transaction =
      oldPayment[0].transaction_id ||
      nextPayment[0].transaction_id ||
      this.component.state.transaction_id;
    try {
      [...oldPayment, ...nextPayment].forEach(async (payment) => {
        payment.athlete_id = athleteId;
        payment.offer_id = item.offer.id;
        payment.transaction_id = payment.transaction_id || transaction;

        await update_paiement(payment);
      });

      const installments = oldPayment.length + nextPayment.length;
      await add_transaction({
        athlete_id: athleteId,
        installments,
        offer_id: item.offer.id,
        transaction_id: transaction,
        amount: parseInt(totalPrice),
      });

      this.component.props.navigation.goBack();
    } catch (err) {
      console.log(err);
      this.component.setState({ loading: false });
      console.warn(err.message);
    }
  };
  onSave = async () => {
    const {
      selectedOffer,
      transaction_id,
      oldPayment,
      nextPayment,
      totalPrice,
    } = this.component.state;

    const { athleteId } = this.component.props.navigation.state.params;

    try {
      [...oldPayment, ...nextPayment].forEach(async (payment) => {
        payment.athlete_id = athleteId;
        payment.offer_id = selectedOffer.id;
        payment.transaction_id = transaction_id;

        await add_manual_payment(payment);
      });

      const installments = oldPayment.length + nextPayment.length;

      await add_transaction({
        athlete_id: athleteId,
        installments,
        offer_id: selectedOffer.id,
        transaction_id: transaction_id,
        amount: parseInt(totalPrice),
      });

      //TODO ADD CONFIRM DIALOG
      if (transaction.status === 200) this.component.props.navigation.goBack();
    } catch (err) {
      console.log(err);
      this.component.setState({ loading: false });
      console.warn(err.message);
    }
  };
}
