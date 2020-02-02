import React from "react";
import "./SettingsForm.scss";
import fontColors from "../../fonts/fontColors";
import fontList from "../../fonts/fontList";
import fontSizes from "../../fonts/fontSizes";

const SettingsForm = props => {
  const {
    onNameChange,
    onBreedChange,
    onSubBreedChange,
    onFontColorChange,
    onFontFamilyChange,
    onFontSizeChange,
    onSave,
    name,
    breed,
    breeds,
    subBreeds,
    subBreed,
    fontColor,
    fontFamily,
    fontSize
  } = props;
  return (
    <form className="settings-form">
      <fieldset>
        <legend>Foto</legend>
        <div className="form-group">
          <div className="group-item">
            <label htmlFor="breed">Raça</label>
            <select
              name="breed"
              id="breed"
              onChange={e => onBreedChange(e.target.value)}
              value={breed ? breed : breeds[0]}
            >
              {Object.keys(breeds).map(db => (
                <option value={db} key={db}>
                  {db}
                </option>
              ))}
            </select>
          </div>
          <div className="group-item">
            <label
              htmlFor="sub-breed"
              style={{ color: subBreed ? "#333" : "#bbb" }}
            >
              Sub-raça
            </label>
            <select
              name="sub-breed"
              id="sub-breed"
              disabled={!subBreeds.length}
              onChange={e => onSubBreedChange(e.target.value)}
              value={subBreed}
            >
              {subBreeds.map(sb => (
                <option value={sb} key={sb}>
                  {sb}
                </option>
              ))}
            </select>
          </div>
        </div>
      </fieldset>

      <fieldset>
        <legend>Texto</legend>
        <div className="form-group">
          <div className="group-item">
            <label htmlFor="name">Nome</label>
            <input
              type="text"
              name="name"
              id="name"
              autoComplete="false"
              onChange={e => onNameChange(e.target.value)}
              value={name}
            />
          </div>

          <div className="group-item">
            <label htmlFor="font-family">Fonte</label>
            <select
              name="font-family"
              id="font-family"
              onChange={e => onFontFamilyChange(e.target.value)}
              value={fontFamily}
            >
              {fontList.map(font => (
                <option value={font} key={font}>
                  {font}
                </option>
              ))}
            </select>
          </div>

          <div className="group-item_wrapper">
            <div className="group-item">
              <label htmlFor="font-color">Cor</label>
              <select
                name="font-color"
                id="font-color"
                onChange={e => onFontColorChange(e.target.value)}
                value={fontColor}
              >
                {fontColors.map(col => (
                  <option value={col.value} key={col.value}>
                    {col.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="group-item">
              <label htmlFor="font-size">Tamanho</label>
              <select
                name="font-size"
                id="font-size"
                onChange={e => onFontSizeChange(e.target.value)}
                value={fontSize}
              >
                {fontSizes.map(size => (
                  <option value={size} key={size}>
                    {size}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </fieldset>
      <div className="form-footer">
        <button onClick={e => onSave(e)}>Salvar</button>
      </div>
    </form>
  );
};

export default SettingsForm;
