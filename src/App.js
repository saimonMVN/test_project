import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import { datas } from "./output";

function App() {
  const [data, setData] = useState(datas?.json);
  const [selectData, setSeleteData] = useState([]);

  const [reRander, setRerendar] = useState(false);


  const onValueChange = (e, sku, propsId) => {
    let modifiedData = data;

    const veriationType = modifiedData.props.find((v) => v.id === propsId);
    const updateData = veriationType.values.find((value) => value.id === sku.id);
    const veriationIndex = modifiedData.props.findIndex((v) => v.id === veriationType.id);

    let ValueIndex = veriationType.values.findIndex((value) => value.id === updateData.id);
    updateData.title = e.target.value;
    veriationType.values.splice(ValueIndex, 1, updateData);

    modifiedData.props.splice(veriationIndex, 1, veriationType);

    setData((pre) => {
      return { ...modifiedData, updated: true };
    });

    // data.props[veriationIndex]: veriationType
  };






  const getVeriationsNameAndValue = (skusProps, productProps) => {


    const arreyOfskusProps = skusProps.split(",");

    let targetVerientSkusProps = arreyOfskusProps.find((x) => Number(x.split(":")[0]) === productProps?.id);

    return productProps.values.find((y) => Number(targetVerientSkusProps.split(":")[1]) === y.id);
  };

  const getVeriationsDetails = (skus, singleProps) => {

    const finnalModifiedResults = skus.map((singleSkus) => {
      const VeriationsData = getVeriationsNameAndValue(singleSkus.props, singleProps);



      return { ...VeriationsData, otherDetails: singleSkus };
    });


    return finnalModifiedResults;
  };


  return (
    <div style={{ width: "500px" }}>
      <ul className="App">
        <li>
          {" "}
          Selete
          <ul>
            {data.skus.map(({ id }) => (
              <button
                onClick={() =>
                  setSeleteData((pre) => {
                    return [...pre, id];
                  })
                }
              >
                {" "}
                Selete
              </button>
            ))}
          </ul>
        </li>
        <li>Variants:::</li>

        {data.props?.map((x) => {


          console.log(getVeriationsDetails(data.skus, x))


          return (
            <li key={x?.id}>
              <span> {x?.name} </span>

              <ul>
                {




                  getVeriationsDetails(data.skus, x).map((i, inx) => {
                    return (
                      <>
                        <li style={{ cursor: "pointer" }} key={inx}>
                          {" "}
                          <input onChange={(e) => onValueChange(e, i, x.id)} type="text" value={i?.title} />{" "}
                        </li>
                      </>
                    );
                  })}
              </ul>
            </li>
          );
        })}

        <li>
          <span> Price </span>

          <ul>
            {getVeriationsDetails(data.skus, data.props[1]).map((j, inx) => {
              return (
                <li key={inx}>
                  {" "}
                  <input type="text" defaultValue={j?.otherDetails.price.actual} />{" "}
                </li>
              );
            })}
          </ul>
        </li>
      </ul>
    </div>
  );
}

export default App;
