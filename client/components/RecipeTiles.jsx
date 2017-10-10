import React from 'react';
import { connect } from 'react-redux'
import { GridList, GridTile } from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import FavoriteBorder from 'material-ui/svg-icons/action/favorite-border'
import AddBorder from 'material-ui/svg-icons/content/add-circle-outline'
import { getRecipeDetails, setShoppingList } from '../store'


export class RecipeTiles extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hover: false
    }
    this.handleMouseEnter = this.handleMouseEnter.bind(this)
    this.handleMouseLeave = this.handleMouseLeave.bind(this)
  }

  handleMouseEnter(e) {
    this.setState({ hover: true })
  }

  handleMouseLeave(e) {
    this.setState({ hover: false })
  }


  render() {
    //1600
    const { recipe } = this.props
    let imageUrl = recipe.imageUrlsBySize["90"].split('=')[0]
    imageUrl = imageUrl + "=s1600-c"
    let hover = false
    const subtitleStr = `by ${recipe.sourceDisplayName}`
    return (
      <GridTile
        key={recipe.id}
        onMouseEnter={(e) => {
          return hover = true
        }}
        onMouseLeave={(e) => {
          return hover = false
        }}
        title={hover ? "Ingredients" : recipe.recipeName}
        titlePosition="top"
        titleBackground="linear-gradient(to bottom, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 50%,rgba(0,0,0,0) 100%)"
        subtitle={<span><b>{subtitleStr}</b></span>}
        subtitleStyle={{ whiteSpace: "initial" }}
        titleStyle={{ fontSize: 18 }}
        actionIcon={[
          <IconButton key={`${recipe.id}-add`} style={{ width: "none" }} tooltip="Add to Shopping List" onClick={(evt) => this.props.addToShoppingList(evt, recipe.ingredients)}><AddBorder color="white" /></IconButton>,
          <IconButton key={`${recipe.id}-fave`} style={{ width: "none" }} tooltip="Favorite"><FavoriteBorder color="white" /></IconButton>]}
      >
        <img src={imageUrl}
          onClick={(evt) => this.props.handleClick(evt, recipe.id)} />
      </GridTile>
    )
  }

}


const mapState = (state) => {
  return {
    shoppingList: state.shoppingList
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleClick(evt, recipeId) {
      dispatch(getRecipeDetails(recipeId))
    },
    addToShoppingList(evt, list) {
      dispatch(setShoppingList(list))
    }
  }
}

export default connect(mapState, mapDispatch)(RecipeTiles)
