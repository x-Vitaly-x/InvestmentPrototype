require 'rails_helper'
require './templated_string.rb'

RSpec.describe TemplatedString, :type => :model do
  context 'correctly renders a string' do
    it 'replaces existing variables in a string' do
      t_s = TemplatedString.new('The quick {{ color }} {{ animal }} jumps over the {{ adjective }} dog')
      res = t_s.evaluate(
          {
              color: 'brown',
              animal: 'fox',
              adjective: 'lazy'
          })
      expect(res).to eq('The quick brown fox jumps over the lazy dog')
    end

    it 'throws error if variable not declared' do
      t_s = TemplatedString.new('The quick {{ color }} {{ animal }} jumps over the {{ adjective }} dog')
      expect {
        t_s.evaluate(
            {
                color: 'brown',
                adjective: 'lazy'
            })
      }.to raise_exception(ArgumentError)
    end
  end
end
