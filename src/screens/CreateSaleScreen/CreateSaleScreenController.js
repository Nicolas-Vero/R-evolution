import { get_coach_offers } from '../../api/Offers';
import { add_manual_payment, add_transaction } from '../../api/Coach';
import AbstractScreenController from '../../components/abstracts/AbstractScreen/AbstractScreenController';
import moment from 'moment';

export default class CreateSaleScreenController extends AbstractScreenController {
  constructor(component) {
    super(component);

    this.initialState = {
      today: moment().format('l'),
      Offer: [],
      date: '',
      nextPayment: [],
      oldPayment: [],
      loaded: false,
      offer_id: '',
      transaction_id: Math.floor(Math.random() * 1000),
      isCreation:
        this.component.props.navigation.state.params?.isCreation || true,
      selectedOffer: null,
      selectedItem: null,
      inputDate: new Date(),
      selectedSaleType: null,
      addPrice: null,
      totalPrice: 0,
      isDeleteSaleVisible: false,
      isValidateSaleDialogVisible: false,
    };
  }
  componentDidMount() {
    // if (this.props.navigation.state.params.item.id){
    // get_payment_details(this.props.navigation.state.params.item.id).then((res)=>{
    //   // let actifPaiement = []
    //   // let awaitingPaiement =[]
    //   res.data.forEach(element => {

    //     console.log('rrrr',element.date, this.state.today);
    //     // if(element.date>this.state.today){
    //     //   actifPaiement.arrayPush(element)
    //     // }else{
    //     //   awaitingPaiement.arrayPush(element)
    //     // }
    //   });

    //   this.setState({Paiement:res.data})
    //  // this.setState({awaitingPaiement:awaitingPaiement})
    // })
    //}
    get_coach_offers()
      .then((res) => {
        this.component.setState({ Offer: res.data.offers });
      })
      .then(() => {
        this.component.setState({ loaded: true });
      });
    // get_paiement_for_coach().then((res) => {
    //   this.setState({ Paiement: res.data });
    // });
  }

  onAddPaiement = () => {
    const {
      today,
      selectedSaleType,
      inputDate,
      paiementList,
      addPrice,
      oldPayment,
      nextPayment,
      totalPrice,
    } = this.component.state;

    const installments = oldPayment.length + nextPayment.length;
    const newPaiement = {
      amount: addPrice,
      installments: installments + 1,
      mode: selectedSaleType,
      date: inputDate,
    };
    const date = moment(inputDate).format('l');

    if (today >= date) {
      this.component.setState({
        oldPayment: [...oldPayment, newPaiement],
        addPrice: null,
        inputDate: new Date(moment(inputDate).add(1, 'months').calendar()),
        totalPrice: totalPrice + parseFloat(addPrice),
      });

      return;
    }

    this.component.setState({
      nextPayment: [...nextPayment, newPaiement],
      addPrice: null,
      inputDate: new Date(moment(inputDate).add(1, 'months').calendar()),
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

  onValidateSale = () => {
    const { oldPayment, selectedItem, nextPayment } = this.component.state;
    const othersSale = nextPayment.filter((item) => item !== selectedItem);
    selectedItem.date = new Date();

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

  onDateChange = (event, selectedDate) => {
    const date = selectedDate || new Date();
    this.component.setState({ inputDate: date });
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
      console.log({
        athlete_id: athleteId,
        installments,
        offer_id: selectedOffer.id,
        transaction_id: transaction_id,
        amount: parseInt(totalPrice),
      });
      const addTransaction = await add_transaction({
        athlete_id: athleteId,
        installments,
        offer_id: selectedOffer.id,
        transaction_id: transaction_id,
        amount: parseInt(totalPrice),
      });

      console.log(addTransaction.status);
      console.log(addTransaction.data);
      console.log(athleteId);
      this.component.props.navigation.goBack();
    } catch (err) {
      console.log(err);
      this.component.setState({ loading: false });
      console.warn(err.message);
    }
  };
}
