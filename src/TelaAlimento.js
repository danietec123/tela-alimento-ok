import React, { useState } from 'react';
import { View, Image, Text, StyleSheet, Button, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import DropDownPicker from 'react-native-dropdown-picker';
import { useNavigation } from '@react-navigation/native';

const TelaAlimento = () => {
  const [selectedItem1, setSelectedItem1] = useState(null);
  const [selectedItem2, setSelectedItem2] = useState(null);
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [quantidade, setQuantidade] = useState('');
  const [nomePapinha, setNomePapinha] = useState('');
  const [inicio, setInicio] = useState('');
  const [fim, setFim] = useState('');

  const navigation = useNavigation();  /*permite a navegação entra as telas*/

  const handleAdicionar = () => {
    // Aqui você pode adicionar a lógica para registrar os valores
  };

  // Função para formatar a entrada de horas e minutos
  const formatarHoraMinuto = (text) => {
    // Remover caracteres não numéricos
    const formattedText = text.replace(/\D/g, '');
    // Adicionar ":" entre os dois primeiros dígitos, se necessário
    if (formattedText.length > 2) {
      return `${formattedText.slice(0, 2)}:${formattedText.slice(2, 4)}`;
    } else {
      return formattedText;
    }
  };

  return (
    <View style={styles.container}>
      {/* Ícone de voltar */}
      <Icon name="arrow-left" size={20} color="#000" onPress={() => navigation.goBack()} style={styles.iconBack} />
      <Text style={styles.titulo}>Alimento</Text>  
      <View>
        <Image
          source={require('../assets/img/mamadeira.png')}
          style={{ width: 45, height: 55 }} //  largura e altura do imagem do icon
        />
      </View>

      <DropDownPicker
        items={[
          { label: 'Mamadeira', value: 'Mamadeira' },
          { label: 'Papinha', value: 'Papinha' },
        ]}
        defaultValue={null}
        placeholder="Selecione o Tipo de Alimento"
        containerStyle={styles.dropdownContainer}
        style={styles.dropdown}
        itemStyle={styles.dropdownItem}
        dropDownStyle={styles.dropdownMenu}
        open={open1}
        setOpen={setOpen1}
        value={selectedItem1}
        setValue={setSelectedItem1}
        zIndex={2000}
        zIndexInverse={2000} /*sobreposição dos botoes*/
      />

      {(selectedItem1 === 'Mamadeira') && ( 
        <View>
          <DropDownPicker
            items={[
              { label: 'Leite em pó', value: 'Leite em pó' },
              { label: 'Leite materno', value: 'Leite materno' },
            ]}
            defaultValue={null}
            placeholder="Selecione o Tipo de Leite"
            containerStyle={styles.dropdownContainer}
            style={styles.dropdown}
            itemStyle={styles.dropdownItem}
            dropDownStyle={styles.dropdownMenu}
            open={open2}
            setOpen={setOpen2}
            value={selectedItem2}
            setValue={setSelectedItem2}
            zIndex={1000}
            zIndexInverse={3000}
          />
          {(selectedItem2 === 'Leite em pó' || selectedItem2 === 'Leite materno') && (
            <TextInput
            style={[styles.input, { alignSelf: 'center' }]} /*input centralizado*/
              placeholder="Quantidade (ml)"
              value={quantidade}
              onChangeText={setQuantidade}
              keyboardType="numeric"
            />
          )}
        </View>
      )}

      {selectedItem1 === 'Papinha' && (
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Nome da Papinha"
            value={nomePapinha}
            onChangeText={setNomePapinha}
          />
          <TextInput
            style={styles.input}
            placeholder="Quantidade (g)"
            value={quantidade}
            onChangeText={setQuantidade}
            keyboardType="numeric"
          />
        </View>
      )}

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Início (hh:mm)"
          value={inicio}
          onChangeText={(text) => setInicio(formatarHoraMinuto(text))}
          keyboardType="numeric"
          maxLength={5}
        />
        <TextInput
          style={styles.input}
          placeholder="Fim (hh:mm)"
          value={fim}
          onChangeText={(text) => setFim(formatarHoraMinuto(text))}
          keyboardType="numeric"
          maxLength={5}
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title="Adicionar"
          color='#30cfa9'
          onPress={handleAdicionar}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20, // Margem inferior do título
    marginTop: -250, // Margem superior do título, ajustada para alinhar com a borda superior
  },
  dropdownContainer: {
    width: '80%',
    marginBottom: 20,
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    backgroundColor: '#d7a4f5', /*cor no botao selecione */
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  dropdownItem: {
    justifyContent: 'flex-start',
    paddingHorizontal: 10,
  },
  dropdownMenu: {
    marginTop: 2,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'center', // Centralizar os elementos na horizontal
    width: '80%',
    marginBottom: 20,
  },
  input: {
    width: '48%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10, // Adicionar um espaçamento inferior
  },
  buttonContainer: { /*botao adicionar*/
    width: '80%',
    marginBottom: 20, // Ajuste a margem inferior conforme necessário
    marginTop: 70, // Mover o botão "Adicionar" um pouco para cima
    borderRadius: 5,
    overflow: 'hidden',
    backgroundColor: '#30cfa9',
  },
  iconBack: { // ícone de voltar
    position: 'absolute', // Posicionamento absoluto
    top: 45, // Distância do topo
    left: 16, // Distância da esquerda
  },
});

export default TelaAlimento;
