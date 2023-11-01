
function ListTagOfArticle({ tagList }) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
            {tagList.map((t, i) => {
              return (
                <span
                  key={i}
                  className="m-1 p-1 border text-secondary"
                  style={{ borderRadius: "10px", fontSize: "10px" }}
                >
                  {t}
                </span>
              );
            })}
          </div>
  )
}

export default ListTagOfArticle;