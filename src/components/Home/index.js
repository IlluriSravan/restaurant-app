import './index.css'
import {Component} from 'react'
import {IoCartOutline} from 'react-icons/io5'
import Card from '../Card'

const tabs = [
  'Salads and Soup',
  'From The Barnyard',
  'From the Hen House',
  'Fresh From The Sea',
  'Biryani',
  'Fast Food',
]
class Home extends Component {
  state = {cart: 0, activeTab: tabs[0], apiData: []}

  componentDidMount() {
    this.getApi()
  }

  change = every => {
    const ch = {
      dishId: every.dish_id,
      dishName: every.dish_name,
      dishPrice: every.dish_price,
      dishImage: every.dish_image,
      dishCurrency: every.dish_currency,
      dishCalories: every.dish_calories,
      dishDescription: every.dish_description,
      dishAvailability: every.dish_availability,
      dishType: every.dish_type,
      nextUrl: every.nexturl,
      addonCat: every.addonCat,
    }
    return ch
  }

  getApi = async () => {
    const {activeTab} = this.state
    const url = 'https://run.mocky.io/v3/77a7e71b-804a-4fbd-822c-3e365d3482cc'
    const response = await fetch(url)
    const data = await response.json()
    console.log(data)
    const firstData = {
      restaurantId: data[0].restaurant_id,
      restaurantName: data[0].restaurant_name,
      restaurantImage: data[0].restaurant_image,
      tableId: data[0].table_id,
      tableName: data[0].table_name,
      tableMenuList: data[0].table_menu_list,
      branchName: data[0].branch_name,
      nextUrl: data[0].nexturl,
    }
    // console.log('1st', firstData.tableMenuList)
    const updatedMenu = firstData.tableMenuList.map(each => ({
      categoryDishes: each.category_dishes,
      menuCategory: each.menu_category,
      menuCategoryId: each.menu_category_id,
      menuCategoryImage: each.menu_category_image,
      nextUrl: each.nexturl,
    }))

    // const filtered = updatedMenu.filter(each => each.menuCategory === activeTab)
    this.setState({apiData: updatedMenu})
  }

  render() {
    const {activeTab, cart, apiData, selectedData} = this.state
    const selectedtab = apiData.filter(each => each.menuCategory === activeTab)
    console.log('sel', selectedtab['0'])
    console.log('sel', selectedtab['0'].categoryDishes)
    return (
      <>
        <div className="top">
          <h1>UNI Resto Cafe</h1>
          <div className="cart">
            <IoCartOutline className="cartImage" />
            <span className="cartNumber">{cart}</span>
          </div>
        </div>
        <div className="head">
          <button
            type="button"
            className="tab"
            onClick={() => {
              this.setState({activeTab: tabs[0]})
            }}
          >
            {tabs[0]}
          </button>
          <button
            type="button"
            className="tab"
            onClick={() => {
              this.setState({activeTab: tabs[1]})
            }}
          >
            {tabs[1]}
          </button>
          <button
            type="button"
            className="tab"
            onClick={() => {
              this.setState({activeTab: tabs[2]})
            }}
          >
            {tabs[2]}
          </button>
          <button
            type="button"
            className="tab"
            onClick={() => {
              this.setState({activeTab: tabs[3]})
            }}
          >
            {tabs[3]}
          </button>
          <button
            type="button"
            className="tab"
            onClick={() => {
              this.setState({activeTab: tabs[4]})
            }}
          >
            {tabs[4]}
          </button>
          <button
            type="button"
            className="tab"
            onClick={() => {
              this.setState({activeTab: tabs[5]})
            }}
          >
            {tabs[5]}
          </button>
        </div>
        <ul className="body">
          <Card key={apiData.menuCategoryId} det={selectedtab} />
        </ul>
      </>
    )
  }
}

export default Home
