export const ItemList =({menus}) =>{
    console.log("menu1s",menus);
    return(
        <div style={{
            display:'flex'
        }}>
            {menus.map(menu =>
                
            <div style={{
                height:'180px',
                width: '180px',
                border: 'solid 1px'
            }}>
                key = {menu.id}
                <div>
                    {menu.name}
                </div>
                <div>
                {menu.price}
                </div>
                <div>
            {menu.type}
                </div>
                <div>
                {menu.desc}
                </div>
            </div>
                )}
        </div>
    )
}