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
      isSaveSaleVisible: false,
      item: this.component.props.navigation.state.params.item,
      isWorking: false,
    };
  }

  screenDidFocus = async () => {
    this.component.setState({
      isWorking: false,
    });
  };

  componentDidMount = async () => {
    const { item } = this.component.state;
    if (item && item.id) {
      this.component.setState({
        transaction_id: item.id,
      });
      const paymentDetail = await get_payment_details(item.id);
      if (paymentDetail.status === 200) {
        this.component.setState({
          transaction_id: item.id,
        });
        const oldPayment = [];
        const nextPayment = [];
        let totalPrice = 0;
        paymentDetail.data.forEach((payment) => {
          payment.date = moment(payment.date).format('DD/MM/YYYY');
          if (payment.is_validate) {
            oldPayment.push({
              ...payment,
            });
          } else {
            nextPayment.push({
              ...payment,
            });
          }

          totalPrice += parseFloat(payment.amount);
        });

        this.component.setState({ totalPrice, oldPayment, nextPayment });
      }
      this.component.setState({ loaded: true });

      return;
    }

    const offers = await get_coach_offers();
    if (offers.status === 200) {
      this.component.setState({ Offer: offers.data.offers });
    }

    this.component.setState({ loaded: true });
  };

  onAddPaiement = () => {
    const {
      selectedSaleType,
      inputDate,
      addPrice,
      oldPayment,
      nextPayment,
      totalPrice,
    } = this.component.state;
    const date = moment(inputDate, 'DD/MM/YYYY').format('YYYY/MM/DD');
    this.component.setState({
      nextPayment: [
        ...nextPayment,
        {
          amount: addPrice,
          installments: oldPayment.length + nextPayment.length + 1,
          mode: selectedSaleType,
          date,
          is_validate: false,
        },
      ],
      addPrice: null,
      inputDate: '',
      totalPrice: totalPrice + parseFloat(addPrice),
    });
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
  openSaveSaleDialog = () => {
    this.component.setState({
      isSaveSaleVisible: true,
    });
  };

  onDismissSaveSaleDialog = () => {
    this.component.setState({
      isSaveSaleVisible: !this.component.state.isSaveSaleVisible,
    });
  };

  onValidateSale = () => {
    const { oldPayment, selectedItem, nextPayment } = this.component.state;
    const othersSale = nextPayment.filter((item) => item !== selectedItem);
    selectedItem.date = moment();
    selectedItem.is_validate = true;

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
    const { item, oldPayment, nextPayment, transaction_id } =
      this.component.state;

    const athleteId = item.athlete.id;

    try {
      [...oldPayment, ...nextPayment].forEach(async (payment) => {
        payment.athlete_id = athleteId;
        payment.offer_id = item.offer.id;
        payment.transaction_id = transaction_id;
        payment.date = new Date(payment.date);

        // payment.mode = selectedSaleType;
        await update_paiement(payment);
      });
      this.component.props.navigation.goBack();
    } catch (err) {
      console.log(err);
      this.component.setState({ loading: false });
      console.warn(err.message);
    }
  };

  onSave = async () => {
    if (this.component.state.isWorking) return;

    this.component.setState({
      isWorking: true,
    });

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

      const transaction = await add_transaction({
        athlete_id: athleteId,
        installments,
        offer_id: selectedOffer.id,
        transaction_id: transaction_id,
        amount: parseInt(totalPrice),
      });

      this.onDismissSaveSaleDialog();
      if (transaction.status === 200) {
        this.component.setState({
          isWorking: false,
        });
        this.component.props.navigation.goBack();

        return;
      }

      this.component.setState({
        isWorking: false,
      });
    } catch (err) {
      this.component.setState({
        loading: false,
        isWorking: false,
      });
      console.warn(err);
    }
  };
}
