import AbstractScreenController from '../../components/abstracts/AbstractScreen/AbstractScreenController';
import { update_coach_booking_other, delete_coach_booking_other } from '../../api/Coach';

export default class UpdateBookCoachScreenController extends AbstractScreenController {
  constructor(component) {
    super(component);

    this.initialState = {
      title: '',
      description: '',
      slot: null,
    };
  }

  componentDidMount = () => {
    if (this.component.props.item) {
      const { other_title, other_note } = this.component.props.item;
      this.component.setState({
        title: other_title,
        description: other_note,
        slot: this.component.props.slot,
      });
    }
  };

  onTitleChange = (value) => {
    this.component.setState({ title: value });
  };

  onDescriptionChange = (value) => {
    this.component.setState({ description: value });
  };

  onUpdatePress = async () => {
    const { title, description } = this.component.state;
    const data = {
      other_title: title,
      other_note: description,
    };

    const res = await update_coach_booking_other(
      data,
      this.component.props.item.id,
    );
    if (res.status === 200) {
      this.component.props.cb &&
        this.component.props.cb(this.component.props.date);
      this.component.props.navigation.goBack();
    }
  };

  onDeletePress = async () => {
    const res = await delete_coach_booking_other(
      this.component.props.item.id,
    );
    if (res.status === 200) {
      this.component.props.cb &&
        this.component.props.cb(this.component.props.date);
      this.component.props.navigation.goBack();
    }
  }
}
