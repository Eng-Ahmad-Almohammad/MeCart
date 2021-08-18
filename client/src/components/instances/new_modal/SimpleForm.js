import React from "react";
import { Field, reduxForm } from "redux-form";

const UnitsOfMeasure = {
  'BAG': 'Bag',
  'BKT': 'Bucket',
  'BND': 'Bundle',
  'BOWL': 'Bowl',
  'BX': 'Box',
  'CRD': 'Card',
  'CM': 'Centimeters',
  'CS': 'Case',
  'CTN': 'Carton',
  'DZ': 'Dozen',
  'EA': 'Each',
  'FT': 'Foot',
  'GAL': 'Gallon',
  'GROSS': 'Gross',
  'IN': 'Inches',
  'KIT': 'Kit',
  'LOT': 'Lot',
  'M': 'Meter',
  'MM': 'Millimeter',
  'PC': 'Piece',
  'PK': 'Pack',
  'PK100': 'Pack 100',
  'PK50': 'Pack 50',
  'PR': 'Pair',
  'RACK': 'Rack',
  'RL': 'Roll',
  'SET': 'Set',
  'SET3': 'Set of 3',
  'SET4': 'Set of 4',
  'SET5': 'Set of 5',
  'SGL': 'Single',
  'SHT': 'Sheet',
  'SQFT': 'Square ft',
  'TUBE': 'Tube',
  'YD': 'Yard'
}
const SimpleForm = (props) => {
  const { handleSubmit, pristine, reset, submitting } = props;
  return (
    <form onSubmit={handleSubmit((val) => props.onNewListSubmit(val, props.id))}>
      <div>
        <label>priceBeforeTax</label>
        <div>
          <Field
            name="priceBeforeTax"
            component="input"
            type="number"
            placeholder="quantity"
          />
        </div>
      </div>
      <div>
        <label>priceAfterTax</label>
        <div>
          <Field
            name="priceAfterTax"
            component="input"
            type="number"
            placeholder="quantity"
          />
        </div>
      </div>
      <div>
        <label>measurement</label>
        <div>
          <Field
            name="measurement"
            component="input"
            type="number"
            placeholder="quantity"
          />
        </div>
      </div>
      <div>
        <label>unitOfMeasure</label>
        <div>
          <Field style={{ display: 'inline-block' }} name="unitOfMeasure" component="select">
            {
              Object.keys(UnitsOfMeasure).map((list,indx) => {
                return <option value={list} key={indx}>{list}</option>
              })
            }
          </Field>
        </div>
      </div>
      <div>
        <button type="submit" disabled={pristine || submitting}>
          Submit
        </button>
        <button type="button" disabled={pristine || submitting} onClick={reset}>
          Clear Values
        </button>
      </div>
    </form>
  );
};

export default reduxForm({
  form: "simple",
})(SimpleForm);
