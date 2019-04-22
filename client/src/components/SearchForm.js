import React from "react";
import { Link } from "react-router-dom";

const SearchForm = props => {
  return (
    <form onSubmit={props.submitForm}>
      <div className="field">
        <label className="label">Your Name (in the format Smith, John!)</label>
        <div className="control has-icons-left">
          <input
            className={
              "input" + (props.errors.personName.length ? " is-danger" : "")
            }
            type="text"
            name="personName"
          />
          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>
        </div>
        {props.errors.personName.length ? (
          <p className="help is-danger">{props.errors.personName}</p>
        ) : null}
      </div>

      <div className="field">
        <label className="label">Company Number</label>
        <div className="control has-icons-left">
          <input
            className={
              "input" + (props.errors.personName.length ? " is-danger" : "")
            }
            type="text"
            name="companyNumber"
          />
          <span className="icon is-small is-left">
            <i className="fas fa-registered" />
          </span>
        </div>
        {props.errors.companyNumber.length ? (
          <p className="help is-danger">{props.errors.companyNumber}</p>
        ) : null}
      </div>

      <div className="field">
        <div className="control">
          <label className="checkbox">
            <input type="checkbox" name="tAndC"/> I agree to the{" "}
            <Link to="/terms-and-conditions">terms and conditions</Link>
          </label>
        </div>
        {props.errors.tAndC.length ? (
          <p className="help is-danger">{props.errors.tAndC}</p>
        ) : null}
      </div>

      <div className="control">
        <button type="submit" className="button is-link">
          Submit
        </button>
      </div>
    </form>
  );
};

export default SearchForm;
