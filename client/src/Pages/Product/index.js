import "./index.css";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

let text =
  "Dermoscent Essential 6 Spot-on Caine 0-10 Kg este un produs multifuncțional Dermoscent® pentru îngrijirea pielii, adaptat la toate tipurile de piele și păr al animalelor, chiar și la cele mai fragile și sensibile. Conține ingrediente active într-o cantitate optimă de acizi grași polinesaturați și agent activ de biodifuzare, esență de ulei de rozmarin, levănțică, melaleuca, cedru, oregano, ulei de boabe de cânepă și extract plantă Azadirachta indică, agenți de calmare și purificare, vitamina E.\n" +
  "ESSENTIAL 6 SPOT-ON a fost testat de către dermatologi veterinari pentru a se asigura de toleranța și de înalta calitate a produsului, pentru animalele tale.\n" +
  "Indicații:\n" +
  "ESSENTIAL 6 SPOT-ON reintegrează filmul hidrolipidic al pielii animalului și menține hidratarea optimă; favorizează balanța eco-sistemului natural dermic și consolidează sistemul de apărare al pielii, în special funcționarea barierei epidermice; purifică și atenuează iritațiile; dezodorizează respectând mirosul natural al animalului; ajută atât la atenuarea căderii părului cât și la creșterea acestuia.\n" +
  "Utilizare:\n" +
  "A se aplica o pipetă în fiecare săptămână pentru un tratament inițial de două luni consecutive, urmat de tratament regulat și continuu atâta vreme cât este necesar sau cel puțin o pipetă la fiecare 2 săptămâni. A se despărți blana între umăr și gât până pielea este vizibilă. A se goli conținutul pipetei pe piele în una sau două picături. Datorită capacității sale de biodifuzare, ESSENTIAL 6 SPOT-ON difuzează pe corpul animalului. A nu se spăla animalul 2 zile înainte și 2 zile după aplicarea produsului.\n" +
  "Notă: Este incompatibil dacă este combinat cu alte produse spot-on.\n" +
  "Precauții:\n" +
  "Pentru utilizarea externă.\n" +
  "A se evita expunerea directă la lumină, umiditate și temperatură ridicată peste 40⁰C. \n" +
  "A nu se păstra după deshiderea pipetelor.\n" +
  "Nu există date de siguranță penru adminstrarea la pisicuțe cu vârsta sub 3 luni.\n" +
  "A nu se lăsa la îndemâna copiilor.\n" +
  "Important: Dermoscent Essential 6 Spot-on Caine 0-10 Kg - 4 Pipete intra in categoria produse dermatologice. Consultati medicul veterinar www.mobile-vet.ro pentru stabilirea diagnosticului, prescrierea medicatiei sau a dietei in functie de nevoile specifice ale cainelui (pisicii) dumneavoastra.\n";

let textList = text.split(/\r?\n/);

console.log(textList);

const Product = () => {
  return (
    <div className="single_product_first_container">
      <div className="single_product_product_container">
        <img
          src="https://mobilepet.ro/image/thumbnails/308x308/dermoscent-spot-on-0-10kg.jpg"
          className="single_product_image"
        ></img>
        <div className="single_product_right_container">
          <h1 className="single_product_title">
            DERMOSCENT ESSENTIAL 6 SPOT-ON CAINE 0-10 KG - 4 PIPETE
          </h1>
          <p className="single_product_price">88,99 RON</p>
          <div className="single_product_quantity">
            <button className="single_product_add_substract_button">
              <RemoveIcon />
            </button>
            <input className="single_product_input"></input>
            <button className="single_product_add_substract_button">
              <AddIcon />
            </button>
          </div>
          <button className="single_product_add_to_Cart_btn">
            ADAUGA IN COS
          </button>
          <button className="single_product_add_to_wishlist">
            ❤️ Adauga in Whislist
          </button>
        </div>
      </div>
      <div className="single_product_second_container">
        <h2 className="single_product_desc_text">Descriere</h2>
        {textList.map((text) => (
          <p className="single_product_desc">{text}</p>
        ))}
        
      </div>
    </div>
  );
};

export default Product;
